# WITM Backend

A NestJS-based backend service for the WITM (What's In The Machine) project. This service integrates with Google's Generative AI (Gemini) and YouTube API to provide machine learning and video processing capabilities.

## Features

- Integration with Google's Generative AI (Gemini)
- YouTube API integration
- Machine video processing capabilities
- RESTful API endpoints
- TypeScript-based development
- Comprehensive testing setup

## Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- Google Cloud Platform account with enabled APIs:
  - Google Generative AI API
  - YouTube Data API v3

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd witm-backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
GOOGLE_API_KEY=your_google_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

## Development

### Running the application

```bash
# development
pnpm run start:dev

# production mode
pnpm run start:prod
```

### Testing

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

### Linting and Formatting

```bash
# lint
pnpm run lint

# format
pnpm run format
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
├── gemini/             # Google Generative AI integration
├── youtube/            # YouTube API integration
└── machine-videos/     # Machine video processing
```

## API Documentation

The API documentation is available at `http://localhost:3000/api` when running the application in development mode.

## Built With

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Google Generative AI](https://ai.google.dev/) - AI model integration
- [YouTube Data API](https://developers.google.com/youtube/v3) - YouTube integration

## License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.
