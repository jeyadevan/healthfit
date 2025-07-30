# HealthFit - Workout Consistency Tracker

A modern, responsive Next.js application for tracking workout consistency and building healthy fitness habits.

## Features

- **Workout Tracking**: Log and track your workouts with detailed information
- **Consistency Monitoring**: Track your workout streaks and build lasting habits
- **Progress Analytics**: Get insights into your fitness journey with smart analytics
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety for better development experience

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── layout.tsx      # Root layout with navigation
│   ├── page.tsx        # Homepage with hero section
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   └── WorkoutCard.tsx # Workout display component
├── lib/               # Utility functions and helpers
│   └── utils.ts       # Common utility functions
└── types/             # TypeScript type definitions
    └── index.ts       # Application types and interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthfit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Layout (`src/app/layout.tsx`)
- Responsive navigation header
- Fitness-themed design with gradient backgrounds
- Footer with branding

### Homepage (`src/app/page.tsx`)
- Hero section introducing the workout tracker concept
- Features section highlighting key benefits
- Call-to-action sections

### WorkoutCard Component (`src/components/WorkoutCard.tsx`)
- Displays individual workout information
- Shows duration, calories, and notes
- Responsive design with hover effects

## Type Definitions

The application includes comprehensive TypeScript types for:
- User profiles
- Workout sessions
- Workout types and categories
- Progress tracking
- Streak calculations
- Goal setting

## Utility Functions

Common utility functions include:
- Date formatting and manipulation
- Duration formatting
- Streak calculations
- Week/month helpers
- CSS class merging

## Design System

The application uses a consistent design system with:
- **Colors**: Blue and green primary colors with gray accents
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Components**: Reusable card and button components
- **Responsive**: Mobile-first design approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- User authentication and profiles
- Workout templates and routines
- Social features and sharing
- Mobile app development
- Advanced analytics and insights
- Integration with fitness devices
