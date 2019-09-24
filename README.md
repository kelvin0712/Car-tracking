# Field-services challenge 
 An application that manages drivers, their devices and vehicles.

 ## After cloning down 
 ### Install dependencies
 In your terminal after you clone your project down, remember to run either `yarn` or `npm install` to build all the dependencies in the project.
 ### Set up PostgreSQL database 
 In your terminal run `docker-compose up`to pull image from docker and access database with port `localhost:5050` to access pgAdmin <br>
 @Username: `pgadmin4@pgadmin.org` <br>
 @Password: `admin` <br>
 Password for database: @Password: `changeme`    
 ### How to use 
 **Search driver by driving their name or vehicle Id**. User can switch between name and vehicle Id by using the switch controller under the search box. After searching the name of the driver or vehicle Id, **marker** will show on the map, by clicking to the marker, user can see the **information of that driver**. Morevoer, there is a button to show the **current location** of the driver under the switch which only appear when user search for a specific driver.   

