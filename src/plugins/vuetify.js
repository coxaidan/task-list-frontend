// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          something: '#00ff00'
        }
      }
    }
  }
},
  components,
  directives,
)
