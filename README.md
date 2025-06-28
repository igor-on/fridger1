# Fridger 🍽️

A comprehensive meal management application that helps you organize your recipes, manage your fridge inventory, plan meals, and generate shopping lists. Built with modern web technologies and containerized for easy deployment.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🍳 Recipe Management

- Create, edit, and delete personal recipes
- Upload recipe images and add external links
- Mark recipes as favorites
- Comprehensive recipe search and filtering
- Detailed recipe instructions and ingredient lists

### 📅 Meal Planning

- Interactive calendar for meal planning
- Schedule recipes for specific dates
- Visual meal planning interface
- Plan ahead for better organization

### 🛒 Smart Shopping Lists

- Auto-generate shopping lists based on planned meals
- Manage grocery items with quantities and units
- Check off items as you shop
- Organize by shopping categories

### ❄️ Fridge Inventory

- Track ingredients and their quantities in your fridge
- Monitor expiration dates
- Get notifications for items about to expire
- Reduce food waste through better tracking

### 👤 User Management

- Secure user authentication with JWT tokens
- Personal user profiles

### 📱 Modern UI/UX

- Responsive design for all devices
- Material Design components
- Smooth animations and transitions
- Calendar integration with FullCalendar

## 🛠️ Technology Stack

### Backend (Spring Boot)

- **Java 17** - Programming language
- **Spring Boot 3.3.5** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **Spring Data REST** - RESTful API endpoints
- **Spring Boot Validation** - Input validation
- **Spring Boot Mail** - Email notifications
- **MySQL** - Primary database
- **JWT (JSON Web Tokens)** - Authentication tokens
- **Lombok** - Reducing boilerplate code
- **Thumbnailator** - Image processing and compression
- **Maven** - Build automation and dependency management

### Frontend (Angular)

- **Angular 17** - Frontend framework
- **TypeScript** - Programming language
- **Angular Material** - UI component library
- **PrimeNG** - Additional UI components
- **Bootstrap 5** - CSS framework
- **Tailwind CSS** - Utility-first CSS framework
- **FullCalendar** - Calendar component
- **RxJS** - Reactive programming
- **JWT Decode** - Token handling
- **HTML2Canvas & jsPDF** - PDF generation
- **Moment.js & date-fns** - Date manipulation
- **Lodash** - Utility functions

### Infrastructure & DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MySQL 8** - Database server
- **Nginx** - Web server for frontend
- **Maven** - Build automation

## 🏗️ Architecture

The application follows a modern **microservices architecture** with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Angular)     │◄──►│ (Spring Boot)   │◄──►│   (MySQL)       │
│   Port: 80      │    │   Port: 8080    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Backend Structure

```
src/main/java/com/app/fridger/
├── auth/           # Authentication logic
├── client/         # External API clients
├── config/         # Configuration classes
├── controller/     # REST controllers
├── exceptions/     # Custom exceptions
├── model/          # Data models and DTOs
├── notifications/  # Email notifications
├── repo/          # Data repositories
├── service/       # Business logic
└── utils/         # Utility classes
```

### Frontend Structure

```
src/app/
├── components/    # Angular components
├── core/         # Core services and guards
├── services/     # HTTP services
├── shared/       # Shared components
└── utils/        # Utility functions
```

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Docker** (version 20.0 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Git** (for cloning the repository)

For development:

- **Java 17** or higher
- **Node.js** (version 18 or higher)
- **Angular CLI** (version 17)
- **Maven** (version 3.8 or higher)
- **MySQL** (version 8.0 or higher)

## 🚀 Installation & Setup

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fridger
   ```

2. **Start the application**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8080
   - Database: localhost:3306

The application will automatically:

- Build the frontend and backend containers
- Set up the MySQL database with initial schema
- Load sample data
- Start all services

### Development Setup

#### Backend Development

1. **Navigate to backend directory**

   ```bash
   cd fridger
   ```

2. **Configure database connection**

   - Update `src/main/resources/application.properties`
   - Set MySQL connection details

3. **Run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend Development

1. **Navigate to frontend directory**

   ```bash
   cd fridger-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080

## 💡 Usage

### Getting Started

1. **Register** a new account or **login** with existing credentials
2. **Set up your profile** with personal information
3. **Add ingredients** to your fridge inventory
4. **Create recipes** with detailed instructions and ingredient lists
5. **Plan meals** using the calendar interface
6. **Generate shopping lists** based on your meal plans

### Key Workflows

#### Recipe Management

- Navigate to "Recipes" to view all your recipes
- Click "Add Recipe" to create a new recipe
- Upload images and add detailed instructions
- Mark recipes as favorites for quick access

#### Meal Planning

- Use the "Calendar" to plan your meals
- Drag and drop recipes onto specific dates
- View planned meals in calendar format
- Adjust plans as needed

#### Inventory Management

- Access "Fridge" to manage your ingredients
- Add new ingredients with quantities and expiration dates
- Update quantities as you use ingredients
- Get notifications for expiring items

#### Shopping Lists

- Navigate to "Groceries" to manage shopping lists
- Auto-generate lists from planned meals
- Manually add additional items
- Check off items as you shop

## 📚 API Documentation

The backend provides RESTful APIs for all functionality:

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Password reset

### Recipe Endpoints

- `GET /api/recipes` - Get all user recipes
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/{id}` - Get recipe by ID
- `PUT /api/recipes/{id}` - Update recipe
- `DELETE /api/recipes/{id}` - Delete recipe

### Fridge Endpoints

- `GET /api/fridge` - Get fridge contents
- `POST /api/fridge/ingredients` - Add ingredient to fridge
- `PUT /api/fridge/ingredients/{id}` - Update ingredient quantity
- `DELETE /api/fridge/ingredients/{id}` - Remove ingredient

### Calendar Endpoints

- `GET /api/calendar/planned-recipes` - Get planned recipes
- `POST /api/calendar/plan` - Plan a recipe for specific date
- `DELETE /api/calendar/plan/{id}` - Remove planned recipe

### Groceries Endpoints

- `GET /api/groceries` - Get shopping lists
- `POST /api/groceries` - Create shopping list
- `PUT /api/groceries/{id}` - Update shopping list
- `DELETE /api/groceries/{id}` - Delete shopping list

## 🔧 Development

### Backend Development

- **Database migrations**: Located in `dbschema/` directory
- **Tests**: Run with `./mvnw test`
- **Build**: Run with `./mvnw clean package`
- **Code style**: Follow Spring Boot conventions

### Frontend Development

- **Linting**: Run with `npm run lint`
- **Testing**: Run with `npm test`
- **Build**: Run with `npm run build`
- **Code style**: Follow Angular style guide

### Environment Configuration

#### Backend Configuration

Create `application-dev.properties` for development:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fridger_db
spring.datasource.username=fridgerapp
spring.datasource.password=fridgerapp
jwt.secret=your-secret-key
spring.mail.host=smtp.gmail.com
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

#### Frontend Configuration

Update `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api",
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write unit tests for new features
- Update documentation as needed
- Test thoroughly before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues & Troubleshooting

### Common Issues

1. **Database connection issues**: Ensure MySQL is running and credentials are correct
2. **Port conflicts**: Check that ports 80, 8080, and 3306 are available
3. **Docker issues**: Ensure Docker daemon is running

### Performance Optimization

- The application includes image compression for recipe photos
- Database queries are optimized with JPA relationships
- Frontend uses lazy loading for better performance

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Happy cooking! 🍳**
