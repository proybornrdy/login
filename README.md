# login Web App using MERN stack
https://loginmernstack.herokuapp.com/

Consist of 3 pages:
1. Login
    * Require Email, Password  
2. Register
    * Require Email, Password, FirstName, LastName Fields  
    * Password used regex to validate: **^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})** <br />
      Password needs to be at least 8 letter, including 1 uppercase, 1 lowercase, 1 number and 1 special character.
    * Image is stored in fs using *Multer*
3. Profile
    * Displays a Name of User, a picture used when registered, and an email address of an user
  
React frontend communicate with backend using *Axios*

