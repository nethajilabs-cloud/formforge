export default function Accessibility() {
  return (
    <div>
      <h1>Accessibility</h1>
      <p>
        FormForge handles accessibility automatically — no extra configuration needed.
        Every field gets correct ARIA attributes, labels, and error announcements out of the box.
      </p>

      <h2>What's automatic</h2>
      <ul>
        <li><code>aria-required</code> on required fields</li>
        <li><code>aria-invalid</code> + <code>aria-errormessage</code> when a field has an error</li>
        <li><code>aria-describedby</code> linking fields to their descriptions</li>
        <li>Error messages announced via <code>role="alert"</code></li>
        <li>Focus moves to first error on failed submit</li>
        <li>Unique stable <code>id</code> per field scoped to the form instance</li>
      </ul>

      <h2>Keyboard navigation</h2>
      <ul>
        <li><strong>Tab / Shift+Tab</strong> — move between fields</li>
        <li><strong>Enter / Space</strong> — activate checkboxes, radio buttons</li>
        <li><strong>Arrow keys</strong> — navigate radio groups</li>
        <li><strong>Enter</strong> — submit form (outside textarea)</li>
      </ul>

      <h2>Screen reader support</h2>
      <p>
        Validation errors are announced via <code>role="alert"</code> so screen readers
        read them immediately when they appear.
      </p>

      <h2>Focus utilities</h2>
      <pre>{`import { focusFirstError, getFocusableElements } from '@formforges/accessibility'

// Move focus to first invalid field
focusFirstError(formElement)

// Get all focusable elements in a container
const els = getFocusableElements(containerElement)`}</pre>

      <h2>ARIA builder</h2>
      <pre>{`import { buildAriaProps, fieldId } from '@formforges/accessibility'

const ariaProps = buildAriaProps('form-email', {
  label: 'Email',
  required: true,
  error: 'Invalid email address',
})
// Returns:
// {
//   id: 'form-email',
//   'aria-required': true,
//   'aria-invalid': true,
//   'aria-errormessage': 'form-email-error',
// }`}</pre>
    </div>
  )
}
