import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // we installed bootstrap icon so make sure to import it here, when this is installed bundler don't know what to do, so in the package json we used loader to tell what to do with that url

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <App />
)
