# OrderFlux 📦🔄


<div align="center">
  
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
  ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  
  <br>
  
  ![Vercel](https://img.shields.io/badge/Frontend_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
  ![Koyeb](https://img.shields.io/badge/Backend_on_Koyeb-121212?style=for-the-badge&logo=koyeb&logoColor=white)
  
</div>

## 🚀 Overview

OrderFlux is a robust full-stack order management system engineered to streamline the entire order lifecycle between administrators and regional distributors. Built with a modern tech stack featuring Spring Boot (Java) for backend operations and Next.js (TypeScript) for the frontend interface, this application delivers enterprise-grade performance with an intuitive user experience.

## ✨ Key Features

### 🔐 Role-Based Access Control
- **👑 Admin Dashboard**
  - Create and assign orders
  - Global visibility across all regions
  - Comprehensive monitoring capabilities
  - System configuration management

- **🚚 Distributor Portal**
  - Region-specific order management
  - Real-time status updates

### 🔄 Order Lifecycle Management

- 📝 **Order Creation** - Intelligent form with validation and region assignment
- 🤝 **Acceptance Flow** - Distributor order claiming with accountability tracking
- 📊 **Status Pipeline** - Granular progression through defined stages:
  ```
  Preparing → Printed → Packing → Shipped → Delivered
  ```

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="50%">
      <h3>🔙 Backend Architecture</h3>
      <img src="https://miro.medium.com/v2/resize:fit:1400/1*CIHazLUXhBCxiho2pfq6qQ.png" width="80%" alt="Spring Boot Architecture">
      <br><br>
      <ul>
        <li><strong>Core</strong>: Java 17</li>
        <li><strong>Framework</strong>: Spring Boot 3.x</li>
        <li><strong>Security</strong>: Spring Security with JWT authentication</li>
        <li><strong>Database</strong>: MongoDB (document store)</li>
        <li><strong>Build Tool</strong>: Maven</li>
      </ul>
    </td>
    <td align="center" width="50%">
      <h3>🖥️ Frontend Implementation</h3>
      <ul>
        <li><strong>Framework</strong>: Next.js 14 with App Router</li>
        <li><strong>Language</strong>: TypeScript 5.x</li>
        <li><strong>Styling</strong>: Tailwind CSS with custom components</li>
        <li><strong>State Management</strong>: React Context API + hooks</li>
        <li><strong>UI Enhancements</strong>: React Toastify, React Icons</li>
        <li><strong>Form Handling</strong>: React Hook Form with Zod validation</li>
      </ul>
    </td>
  </tr>
</table>

## 🚦 Getting Started

### Prerequisites

- Java 17 JDK
- Node.js 18+ and npm/yarn
- MongoDB 5.0+
- Maven 3.8+
- Git

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krintox/orderflux.git
   cd orderflux
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Build and run the application
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Run development server
   npm run dev
   ```

4. **Access the application**
   - 🌐 Frontend: `http://localhost:3000`
   - 🔌 Backend API: `http://localhost:8080`

## ⚙️ Configuration Options

### Backend Configuration
```properties
# application.properties
spring.data.mongodb.uri=${DB_URI}
spring.data.mongodb.database=orderflux
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000
server.port=8080
```

## 📱 Application Workflow


1. **Authentication** - Secure login with JWT token generation
2. **Order Creation** - Intuitive form with validation and region assignment
3. **Oversight** - Comprehensive view of all orders with filtering capabilities
4. **Management** - Ability to edit, delete, and track all orders

### Distributor Experience

1. **Region-Based Access** - View only orders assigned to your region
2. **Order Acceptance** - Take ownership of orders with a single click
3. **Status Updates** - Move orders through defined stages with validation
4. **Completion** - Mark orders as delivered with optional feedback

## 🔌 API Reference

| Endpoint | Method | Description | Access Control |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | Register new user account | Public |
| `/api/auth/login` | POST | Authenticate and generate JWT | Public |
| `/api/orders` | GET | Retrieve all accessible orders | Admin: global, Distributor: regional |
| `/api/orders` | POST | Create new order | Admin only |
| `/api/orders/{id}` | GET | Get specific order details | Owner or Admin |
| `/api/orders/{id}` | PUT | Update order information | Owner or Admin |
| `/api/orders/{id}` | DELETE | Remove order from system | Admin only |
| `/api/orders/{id}/accept` | POST | Accept responsibility for order | Distributor |
| `/api/orders/region/{region}` | GET | Filter orders by region | Admin or matching region |
| `/api/orders/status/{status}` | GET | Filter orders by current status | Admin only |
| `/api/users/profile` | GET | Get current user details | Authenticated |
| `/api/analytics/performance` | GET | Retrieve performance metrics | Admin only |

## 🧪 Testing

```bash
# Backend unit and integration tests
cd backend
mvn test

# Frontend component and integration tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend on Koyeb
```bash
# Build the JAR file
cd backend
mvn clean package

# Deploy to Koyeb using their CLI
koyeb app init orderflux-api --docker $PWD/target/orderflux-0.1.0.jar
```

### Frontend on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
cd frontend
vercel

# For production deployment
vercel --prod
```

For continuous deployment:
1. Connect your GitHub repository to Koyeb and Vercel
2. Configure environment variables in their respective dashboards
3. Enable automatic deployments on code commits

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our style guidelines and includes appropriate tests.

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [Next.js](https://nextjs.org/) - Frontend framework
- [MongoDB](https://www.mongodb.com/) - Database solution
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [JWT](https://jwt.io/) - Token-based authentication

---

<div align="center">
  <p>
    Built with ❤️ by <a href="https://github.com/Krintox">Krintox</a>
  </p>
  <p>
    <a href="https://koyeb.com"><img src="https://img.shields.io/badge/Backend_Hosted_on-Koyeb-black?style=for-the-badge" alt="Koyeb"></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Frontend_Deployed_on-Vercel-black?style=for-the-badge" alt="Vercel"></a>
  </p>
</div>
