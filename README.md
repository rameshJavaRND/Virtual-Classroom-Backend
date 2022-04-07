# The-Virtual-Classrooms

## Project Description
 
The Virtual Classroom is a collaborative teaching tool to assist the students to learn in an interactive manner.  It aims to complement the efforts of teachers to integrate technology into their classrooms and link the students to the Internet in educationally productive ways and provide them a stimulating, positive and enjoyable environment to study.

It contains the following elements:-
 
1. Student Login:
            It enables a person to login as a student or sign up if he/she has not registered for the classroom.
            Once logged in a student has the following features:-
                        a) Edit Profile:
                                    It allows modifying the details
                        b) Study Material & Video Lectures:
                                    It displays a list of ppts & interactive video lessons categorized by subjects as posted by the faculty
                        c) Ask doubts:
                                    It enables the students to ask questions
                        d) Answers:
                                    It shows the answers by the teachers to the questions asked by various students
2. Faculty Login:
            It enables a person to login as a faculty member or sign up if he/she has not registered for the classroom.
Once logged in a faculty member has the following features:-
a) Edit Profile:
                                    It allows modifying the details
                        b) Study Material & Video Lectures:
                                    It allows the faculty members to post & remove ppts & video lessons                                             
                                    
                        c) Doubts: 
                                    It shows all the questions asked by the students
                        d) Answers:
                                    It enables teachers to answer the questions asked by the students
3. Administrator Login
            The administrator is the ultimate controller of the application with the highest authority.
            He/she has the following features:-
a)      Student/Faculty:
It displays a list of students/faculty members registered for the classroom
b)      Student/Faculty  req:

It displays a list of students/faculty members whose sign up request is still pending
c)      PPT (pload/del)/Video(upload/del):

It displays a list of ppts & videos posted by the faculty members. The administrator has the power to remove ppts/videos from the list and upload according to wish
d)      Question/Ans

It displays a list of  questions asked by students/answers to questions by teachers. The administrator has the power to delete questions/answers from the list.



## Install these -
```````````````````
npm install
npm install bcrypt
npm install multer


Run the app -
````````````
nodemon index.js


## API routes -
``````````````
http://localhost:3001/api/flogin - faculty login
http://localhost:3001/api/fregister - faculty register
http://localhost:3000/api/studentallfaculty - list all faculty for students
http://localhost:3000/api/adminallfaculty - list all faculty for admin
http://localhost:3000/api/fgetProfile/id - get specific faculty profile details
http://localhost:3000/api/feditProfile/id - edit specific faculty profile details


http://localhost:3000/api/adminLogin - admin login

http://localhost:3000/api/allSubjects - list all subjects
http://localhost:3000/api/allBranches - list all branches
http://localhost:3000/api/addSubject - add subject
http://localhost:3000/api/addBranch - add branch
http://localhost:3000/api/editSubject/id - edit subject
http://localhost:3000/api/editBranch/id - edit branch

http://localhost:3000/api/singleFile - upload single file
http://localhost:3000/api/multipleFiles - upload multiple files
http://localhost:3000/api/getSingleFiles - fetch single file
http://localhost:3000/api/getMultipleFiles - fetch all files
