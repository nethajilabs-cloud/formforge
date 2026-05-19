export default function Themes() {
  return (
    <div>
      <h1>Themes</h1>
      <p>FormForge ships with three built-in themes, each built on a token system.</p>

      <h2>Usage</h2>
      <pre>{`<FormForge schema={schema} theme="modern" />
<FormForge schema={schema} theme="minimal" />
<FormForge schema={schema} theme="enterprise" />`}</pre>

      <h2>Built-in themes</h2>
      <table>
        <thead>
          <tr><th>Theme</th><th>Style</th></tr>
        </thead>
        <tbody>
          <tr><td><code>modern</code></td><td>Indigo accents, rounded corners, subtle shadows</td></tr>
          <tr><td><code>minimal</code></td><td>Black accents, sharp focus rings, no shadows</td></tr>
          <tr><td><code>enterprise</code></td><td>Teal accents, professional, dense layout</td></tr>
        </tbody>
      </table>

      <h2>Token structure</h2>
      <pre>{`interface ThemeTokens {
  colors: {
    primary, primaryHover,
    background, surface,
    border, borderFocus,
    text, textMuted, textPlaceholder,
    error, errorBackground, success,
  }
  radii:   { sm, md, lg }
  spacing: { xs, sm, md, lg, xl }
  font:    { family, sizeBase, sizeSm, weightNormal, weightMedium }
  shadow:  { sm, focus }
}`}</pre>

      <h2>Custom theme</h2>
      <pre>{`import type { ThemeTokens } from '@formforges/themes'
import { modernTokens } from '@formforges/themes'

const myTheme: ThemeTokens = {
  ...modernTokens,
  colors: {
    ...modernTokens.colors,
    primary: '#f59e0b',       // amber
    primaryHover: '#d97706',
    borderFocus: '#f59e0b',
  },
}`}</pre>
    </div>
  )
}
