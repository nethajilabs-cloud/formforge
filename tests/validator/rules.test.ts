import { describe, it, expect } from 'vitest'
import { rules } from '../../packages/validator/src/rules/index.js'

const ctx = {} // empty form values context

// ─── required ────────────────────────────────────────────────────────────────

describe('rules.required', () => {
  const validate = rules.required()

  it('fails on empty string', () => expect(validate('', ctx)).toBeTruthy())
  it('fails on whitespace-only string', () => expect(validate('   ', ctx)).toBeTruthy())
  it('fails on null', () => expect(validate(null, ctx)).toBeTruthy())
  it('fails on undefined', () => expect(validate(undefined, ctx)).toBeTruthy())
  it('passes on non-empty string', () => expect(validate('hello', ctx)).toBeNull())
  it('passes on 0 (falsy but valid)', () => expect(validate(0, ctx)).toBeNull())
  it('passes on false (checkbox unchecked explicitly)', () => expect(validate(false, ctx)).toBeNull())
  it('passes on array with items', () => expect(validate(['a'], ctx)).toBeNull())

  it('uses custom message', () => {
    const v = rules.required('Field is mandatory')
    expect(v('', ctx)).toBe('Field is mandatory')
  })
})

// ─── email ───────────────────────────────────────────────────────────────────

describe('rules.email', () => {
  const validate = rules.email()

  it('passes on valid emails', () => {
    expect(validate('a@b.com', ctx)).toBeNull()
    expect(validate('user.name+tag@example.co.uk', ctx)).toBeNull()
    expect(validate('123@domain.org', ctx)).toBeNull()
  })

  it('fails on email without @', () => expect(validate('notanemail', ctx)).toBeTruthy())
  it('fails on email without domain', () => expect(validate('user@', ctx)).toBeTruthy())
  it('fails on email without TLD', () => expect(validate('user@domain', ctx)).toBeTruthy())
  it('passes on empty value (not required check)', () => expect(validate('', ctx)).toBeNull())
  it('passes on null (not required check)', () => expect(validate(null, ctx)).toBeNull())

  it('uses custom message', () => {
    const v = rules.email('Enter a valid email')
    expect(v('bad', ctx)).toBe('Enter a valid email')
  })
})

// ─── minLength ───────────────────────────────────────────────────────────────

describe('rules.minLength', () => {
  it('passes when length equals minimum', () => expect(rules.minLength(3)('abc', ctx)).toBeNull())
  it('passes when longer than minimum', () => expect(rules.minLength(3)('abcde', ctx)).toBeNull())
  it('fails when shorter than minimum', () => expect(rules.minLength(5)('hi', ctx)).toBeTruthy())
  it('includes default message with count', () => {
    const err = rules.minLength(8)('short', ctx)
    expect(err).toContain('8')
  })
  it('uses custom message', () => {
    expect(rules.minLength(4, 'Too short!')('ab', ctx)).toBe('Too short!')
  })
  it('passes on empty string (not required check)', () => {
    expect(rules.minLength(3)('', ctx)).toBeNull()
  })
})

// ─── maxLength ───────────────────────────────────────────────────────────────

describe('rules.maxLength', () => {
  it('passes when length equals maximum', () => expect(rules.maxLength(5)('hello', ctx)).toBeNull())
  it('passes when shorter than maximum', () => expect(rules.maxLength(10)('hi', ctx)).toBeNull())
  it('fails when longer than maximum', () => expect(rules.maxLength(3)('toolong', ctx)).toBeTruthy())
  it('includes default message with count', () => {
    const err = rules.maxLength(5)('toolongstring', ctx)
    expect(err).toContain('5')
  })
  it('uses custom message', () => {
    expect(rules.maxLength(3, 'Max 3 chars')('abcd', ctx)).toBe('Max 3 chars')
  })
})

// ─── min ─────────────────────────────────────────────────────────────────────

describe('rules.min', () => {
  it('passes at exact minimum', () => expect(rules.min(10)(10, ctx)).toBeNull())
  it('passes above minimum', () => expect(rules.min(10)(20, ctx)).toBeNull())
  it('fails below minimum', () => expect(rules.min(10)(5, ctx)).toBeTruthy())
  it('passes on empty string (not required check)', () => expect(rules.min(5)('', ctx)).toBeNull())
  it('passes on null', () => expect(rules.min(5)(null, ctx)).toBeNull())
  it('includes minimum in default message', () => {
    expect(rules.min(18)(10, ctx)).toContain('18')
  })
  it('uses custom message', () => {
    expect(rules.min(0, 'Must be non-negative')(-1, ctx)).toBe('Must be non-negative')
  })
})

// ─── max ─────────────────────────────────────────────────────────────────────

describe('rules.max', () => {
  it('passes at exact maximum', () => expect(rules.max(100)(100, ctx)).toBeNull())
  it('passes below maximum', () => expect(rules.max(100)(50, ctx)).toBeNull())
  it('fails above maximum', () => expect(rules.max(100)(150, ctx)).toBeTruthy())
  it('passes on empty string', () => expect(rules.max(10)('', ctx)).toBeNull())
  it('includes maximum in default message', () => {
    expect(rules.max(99)(200, ctx)).toContain('99')
  })
})

// ─── pattern ─────────────────────────────────────────────────────────────────

describe('rules.pattern', () => {
  const phonePattern = /^\+?[\d\s\-()]{7,}$/
  const validate = rules.pattern(phonePattern)

  it('passes on matching value', () => expect(validate('+1 555 0000', ctx)).toBeNull())
  it('fails on non-matching value', () => expect(validate('abc', ctx)).toBeTruthy())
  it('passes on empty string', () => expect(validate('', ctx)).toBeNull())
  it('uses custom message', () => {
    const v = rules.pattern(/^\d+$/, 'Numbers only')
    expect(v('abc', ctx)).toBe('Numbers only')
  })
  it('default message is "Invalid format"', () => {
    expect(rules.pattern(/^\d+$/)('abc', ctx)).toBe('Invalid format')
  })
})

// ─── url ─────────────────────────────────────────────────────────────────────

describe('rules.url', () => {
  const validate = rules.url()

  it('passes on valid http URL', () => expect(validate('http://example.com', ctx)).toBeNull())
  it('passes on valid https URL', () => expect(validate('https://example.com/path?q=1', ctx)).toBeNull())
  it('fails on plain text', () => expect(validate('not a url', ctx)).toBeTruthy())
  it('fails on missing protocol', () => expect(validate('example.com', ctx)).toBeTruthy())
  it('passes on empty string', () => expect(validate('', ctx)).toBeNull())
  it('passes on null', () => expect(validate(null, ctx)).toBeNull())
  it('uses custom message', () => {
    expect(rules.url('Bad URL')('nope', ctx)).toBe('Bad URL')
  })
})

// ─── oneOf ───────────────────────────────────────────────────────────────────

describe('rules.oneOf', () => {
  const validate = rules.oneOf(['red', 'green', 'blue'])

  it('passes when value is in the list', () => expect(validate('red', ctx)).toBeNull())
  it('fails when value is not in the list', () => expect(validate('yellow', ctx)).toBeTruthy())
  it('fails on empty string not in list', () => expect(validate('', ctx)).toBeTruthy())
  it('uses custom message', () => {
    const v = rules.oneOf(['a', 'b'], 'Pick a or b')
    expect(v('c', ctx)).toBe('Pick a or b')
  })
  it('includes allowed values in default message', () => {
    const err = rules.oneOf(['x', 'y'])('z', ctx)
    expect(err).toContain('x')
    expect(err).toContain('y')
  })
})
