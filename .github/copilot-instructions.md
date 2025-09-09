# Bank File Analyzer

A React web application for analyzing bank CSV files and visualizing income vs expense data using DevExtreme charts. The app reads CSV files in KiwiBank format and displays interactive stacked bar charts showing financial transactions over time.

**ALWAYS** reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites
- Node.js v20+ (tested with v20.19.5)
- npm v10+ (tested with v10.8.2)

### Bootstrap and Build Process
**IMPORTANT**: This repository requires webpack polyfills for React compatibility. All commands below are validated and ready to use.

1. **Install dependencies**:
   ```bash
   npm install
   ```
   - Takes approximately 55 seconds
   - May show warnings about deprecated packages - these are expected and safe to ignore
   - Will install 1470+ packages including React, DevExtreme, and build tools

2. **Build the application**:
   ```bash
   CI=false npm run build
   ```
   - **NEVER CANCEL**: Takes approximately 15-20 seconds. ALWAYS set timeout to 60+ seconds minimum.
   - **CRITICAL**: Must set `CI=false` environment variable or build will fail due to CSS warnings being treated as errors
   - Creates optimized production build in `build/` directory
   - Expected output size: ~380kb JS, ~72kb CSS (gzipped)

3. **Run development server**:
   ```bash
   CI=false npm start
   ```
   - **NEVER CANCEL**: Takes 10-15 seconds to start. Set timeout to 60+ seconds.
   - Starts development server on http://localhost:3000
   - Shows deprecation warnings - these are expected and safe to ignore
   - Hot reload is available but Fast Refresh requires React 16.10+ (app uses 16.8.6)

4. **Run tests**:
   ```bash
   CI=false npm test -- --watchAll=false
   ```
   - **NEVER CANCEL**: Takes approximately 2-3 seconds. Set timeout to 30+ seconds.
   - Runs single basic render test
   - All tests should pass without issues

5. **Lint code**:
   ```bash
   npx eslint src/ --ext .js,.jsx
   ```
   - Takes 2-3 seconds
   - No output means no linting errors
   - **ALWAYS** run this before committing changes

## Validation Scenarios

**CRITICAL**: After making any changes, ALWAYS perform these validation steps:

1. **Complete Build Test**:
   ```bash
   npm install && CI=false npm run build && CI=false npm test -- --watchAll=false
   ```
   - Should complete without errors in under 90 seconds total

2. **Functional Test**:
   - Start development server: `CI=false npm start`
   - Navigate to http://localhost:3000
   - Verify "Bank File Analyzer" heading appears
   - Click "Select CSV File" button
   - Upload a CSV file with format: Date,Description,Memo,Amount
   - Verify income vs expense chart displays correctly
   - Test "Reset Zoom" button functionality

3. **Sample CSV for Testing**:
   Create `/tmp/test-bank.csv` with this content:
   ```csv
   Date,Description,Memo,Amount
   2023-01-01,Salary deposit,Monthly salary,3000.00
   2023-01-02,Grocery shopping,Supermarket,-150.75
   2023-01-03,Gas bill,Monthly utility,-85.50
   ```

## Known Issues and Workarounds

1. **Webpack 5 Polyfills**: The app uses CRACO configuration to provide Node.js polyfills (stream, buffer, process) required by DevExtreme components. This is already configured - do not modify `craco.config.js`.

2. **CI Environment**: Build fails in CI environments due to CSS warnings. ALWAYS use `CI=false` prefix for build/start/test commands.

3. **React Version**: App uses React 16.8.6 which lacks some modern features. Fast Refresh is disabled but hot reload works.

4. **Security Vulnerabilities**: npm audit shows 36 vulnerabilities - these are in dependencies and do not affect functionality. Do not run `npm audit fix --force` as it may break the build.

## Project Structure

### Key Files and Directories
```
├── src/
│   ├── App.js                 # Main application component
│   ├── App.test.js           # Basic render test
│   ├── components/
│   │   ├── FileLoader.jsx    # CSV upload and chart rendering
│   │   └── MessageBox.jsx    # Simple message component (unused)
│   └── index.js              # Application entry point
├── public/                   # Static assets
├── build/                    # Production build output (generated)
├── package.json              # Dependencies and scripts
├── craco.config.js          # Webpack configuration overrides
└── .env                     # Environment variables
```

### Core Components
- **FileLoader.jsx**: Main functionality - handles CSV parsing for KiwiBank format and renders DevExtreme stacked bar charts
- **App.js**: Root component with basic layout
- **MessageBox.jsx**: Unused utility component for displaying messages

## Development Guidelines

1. **Making Changes**:
   - Always test locally with development server
   - Run linting before committing: `npx eslint src/ --ext .js,.jsx`
   - Test CSV upload functionality with real data
   - Verify chart rendering and zoom functionality

2. **Adding Dependencies**:
   - Use `npm install <package>` for runtime dependencies
   - Use `npm install <package> --save-dev` for development dependencies
   - Test build process after adding new dependencies

3. **DevExtreme Components**:
   - Chart components are from devextreme-react
   - Configuration is complex - reference existing FileLoader.jsx for patterns
   - Charts support zooming, panning, and tooltips

## Common Commands Reference

```bash
# Clean install
rm -rf node_modules package-lock.json && npm install

# Development workflow
CI=false npm start                           # Start dev server
CI=false npm run build                       # Production build
CI=false npm test -- --watchAll=false       # Run tests
npx eslint src/ --ext .js,.jsx              # Lint code

# Debugging
npm ls devextreme                           # Check DevExtreme version
node --version                              # Check Node.js version
```

## Performance Notes
- **npm install**: ~55 seconds
- **Build time**: ~15 seconds (NEVER CANCEL - set 60+ second timeout)
- **Test time**: ~2 seconds (NEVER CANCEL - set 30+ second timeout)
- **Dev server start**: ~10 seconds (NEVER CANCEL - set 60+ second timeout)