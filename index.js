const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Function to gather information about the team members
function gatherTeamInfo() {
   inquirer
      .prompt([
         {
            type: "input",
            name: "name",
            message: "Enter the team manager's name:",
         },
         {
            type: "input",
            name: "id",
            message: "Enter the team manager's employee ID:",
         },
         {
            type: "input",
            name: "email",
            message: "Enter the team manager's email address:",
         },
         {
            type: "input",
            name: "officeNumber",
            message: "Enter the team manager's office number:",
         },
      ])
      .then((managerData) => {
         const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
         teamMembers.push(manager);
         addTeamMember();
      });
}

// Function to add more team members (Engineers or Interns)
function addTeamMember() {
   inquirer
      .prompt([
         {
            type: "list",
            name: "role",
            message: "Choose the role of the team member to add:",
            choices: ["Engineer", "Intern", "Finish building the team"],
         },
      ])
      .then((userChoice) => {
         switch (userChoice.role) {
            case "Engineer":
               addEngineer();
               break;
            case "Intern":
               addIntern();
               break;
            default:
               // Finish building the team
               generateHTML();
         }
      });
}

// Function to gather information about an Engineer
function addEngineer() {
   inquirer
      .prompt([
         {
            type: "input",
            name: "name",
            message: "Enter the engineer's name:",
         },
         {
            type: "input",
            name: "id",
            message: "Enter the engineer's employee ID:",
         },
         {
            type: "input",
            name: "email",
            message: "Enter the engineer's email address:",
         },
         {
            type: "input",
            name: "github",
            message: "Enter the engineer's GitHub username:",
         },
      ])
      .then((engineerData) => {
         const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
         teamMembers.push(engineer);
         addTeamMember();
      });
}

// Function to gather information about an Intern
function addIntern() {
   inquirer
      .prompt([
         {
            type: "input",
            name: "name",
            message: "Enter the intern's name:",
         },
         {
            type: "input",
            name: "id",
            message: "Enter the intern's employee ID:",
         },
         {
            type: "input",
            name: "email",
            message: "Enter the intern's email address:",
         },
         {
            type: "input",
            name: "school",
            message: "Enter the intern's school:",
         },
      ])
      .then((internData) => {
         const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
         teamMembers.push(intern);
         addTeamMember();
      });
}

// Function to generate the HTML file
function generateHTML() {
   const htmlContent = render(teamMembers);
   fs.writeFileSync(outputPath, htmlContent);
   console.log(`Team HTML file generated at: ${outputPath}`);
}

// Initialize the application
gatherTeamInfo();
