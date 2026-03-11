# Harpenden Arrows Handicap Timer

This project is an Angular application designed to serve as a handicap timer for the Harpenden Arrows running club. It features a countdown timer that announces each runner's name when their expected time is reached. The application integrates with a SQLite backend using FastAPI for data management.

## Project Structure

```
harpenden-arrows-handicap-timer
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── timer
│   │   │   │   ├── timer.component.ts
│   │   │   │   └── timer.component.html
│   │   │   └── runner-list
│   │   │       ├── runner-list.component.ts
│   │   │       └── runner-list.component.html
│   │   ├── services
│   │   │   ├── timer.service.ts
│   │   │   └── api.service.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   ├── assets
│   ├── styles.css
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- Countdown timer starting from 30 minutes.
- Ability to add runners with their expected finish times.
- Announcements for each runner as their expected time is reached.
- Integration with a SQLite database via FastAPI for storing and retrieving runner data.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd harpenden-arrows-handicap-timer
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   ng serve
   ```

4. **Backend Setup:**
   - Ensure you have Python and FastAPI installed.
   - Set up the SQLite database as per the FastAPI documentation.
   - Run the FastAPI server to handle API requests.

## Usage

- Open your browser and navigate to `http://localhost:4200`.
- Use the interface to add runners and start the timer.
- The application will announce each runner's name as their expected time is reached.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.