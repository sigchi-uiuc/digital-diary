# digital-diary

## Prerequisites

Before running the project, make sure you have the following installed and configured:

1. **Visual Studio Code**
   
   Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/).

3. **Node.js and npm**
   
   Download and install Node.js (which includes npm) from [https://nodejs.org/](https://nodejs.org/).  
   Verify installation in the terminal:
   ```bash
   node -v
   npm -v
   ```
   If successfully installed, this should output the installed version numbers of Node.js and npm.

4. **HomeBrew (macOS only)**
   
   Install Homebrew to manage packages like Git:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   Update Homebrew:
   ```bash
   brew update
   ```

6. **Git**
   
   Install Git using Homebrew:
   ```bash
   brew install git
   ```
   Verify Git installation:
   ```bash
   git --version
   ```

8. **Clone the Repository**
   
   Use Git to clone the project repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
   After completing these steps, you are ready to run the project!

## How to Run
1. **Open the Project**
   
   Open the `digital-diary` or `my-app` folder in **VS Code**.

3. **Navigate to the Correct Directory**
   
   Ensure you are in the `my-app` directory.  
   If you are in `digital-diary`, run:
   ```bash
   cd my-app
   ```
   
5. **Install Dependencies**
   
   ```bash
   npm install
   npx prisma generate
   ```

7. **Start the Development Server**
   
   ```bash
   npm run dev
   ```

9. **Open the App in Browser**
    
   Click the link in the terminal or open in your browser: [http://localhost:3000](http://localhost:3000).
   
