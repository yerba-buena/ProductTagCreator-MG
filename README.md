# Product Tag Creator

A modern web application for creating beautiful product tags with customizable design elements. Features elegant typography, transparent peachy backgrounds, and professional barcode generation.

![Product Tag Creator](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## Features

- **Real-time Tag Preview**: See your product tags update instantly as you edit
- **Elegant Typography**: Crimson Text serif font with rounded terminals for product names
- **Beautiful Design**: Transparent peachy blush backgrounds with forest green accents
- **Professional Barcodes**: Generate long 28-digit barcodes that stretch across the tag
- **Form Validation**: Complete input validation with error handling
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom color schemes
- **shadcn/ui** components for consistent design
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **In-memory storage** for fast development
- **RESTful API** endpoints
- **Comprehensive error handling**

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yerba-buena/ProductTagCreator-MG.git
cd ProductTagCreator-MG
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Usage

1. **Edit Product Details**: Use the form on the right to enter product information
   - Product name (displayed in elegant serif font)
   - Price (automatically formatted with dollar sign)
   - Barcode (or generate a random 28-digit code)

2. **Preview Your Tag**: Watch the tag update in real-time on the left side
   - Transparent peachy background with elegant styling
   - Professional barcode display at the bottom
   - Clean, boutique-style appearance

3. **Generate Barcodes**: Click the dice icon to generate random 28-digit barcodes

## API Endpoints

- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product
- `GET /api/barcode/generate` - Generate random barcode

## Design Features

### Color Scheme
- **Primary**: Dark forest green (`hsl(120, 25%, 25%)`)
- **Background**: Peachy blush with transparency (`rgba(255, 218, 185, 0.3)`)
- **Text**: Professional dark slate for readability

### Typography
- **Product Names**: Crimson Text serif font with rounded terminals
- **UI Elements**: Clean sans-serif for optimal readability
- **Barcodes**: Monospace font for technical accuracy

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
└── README.md            # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React SPA with client-side routing
- **Backend**: Express API server with RESTful endpoints
- **Storage**: In-memory storage for fast development
- **Validation**: Zod schemas for type-safe data validation
- **State Management**: TanStack Query for server state

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with modern React and Express.js
- UI components from shadcn/ui
- Typography using Google Fonts (Crimson Text)
- Icons from Lucide React