As a developer you are given the task to design and develop the following feature. This feature can be developed in isolation of the rest of the system, so no prior knowledge of the existing architecture is required.
You do not have to build the authentication and authorization service - assume this is already provided however questions will be asked around Security topic. Database access including Mongo, Postgres
Localz is developing a product feature that manages drivers, their devices and vehicles.

## Drivers will have the following attributes (at least)
firstname/lastname 
mobile number 
profile picture
last login date

Each driver will be carrying a device (android or iOS) and will run our app. Our app will submit location data every minute. Each device has the following attributes (at least)
device OS (ios/android) device OS version device location
Before driving, driver then assigns themselves to a vehicle.

### Each available vehicle has the following attributes (at least)
vehicle reg number vehicle type

The solution will need to address the following requirements
We need to know where the driver is at any point in time, being able to search for them by name (or location (map window)). We need to know where the driver has been for the whole day (historical) and current location. We need to know who has been driving a particular vehicle and where they have been all day. (Search by vehicle) Need to capture all activities and store them in an audit log for security and auditing perspective. Take home challenges
Please note:
The architecture including database/storage structure solution design is up to you.
We expect you to build a set of API to handle the specified requirements. Feel free to add more data fields to capture - what you think is necessary - to complete the solution. Location data is captured in a geojson format ( Point type)
The outcome we are expecting:
An implementation of the solution in the language of your choosing, preferred to be in javascript, typescript with nodejs/mongodb/postgresql. Your approach and implementation on testing. Your scaling out approach. Come up with the results that you think may make sense for the business/view
Frontend challenges
A UI (preferred react framework) - that calls the backend you develop to answers the requirements above. Feel free to design the UX. Build a reusable table component (without a third party library) Result can be displayed in a table or map view (do timebox it) Front end testing approach
Feel free to ask questions by sending an email to us. In-person challenges
Challenges
How would you design the data model to store the information? Feel free to ask questions. How would you design the APIs for the above requirements? How would you design this in a microservice architecture? How would you retrieve a list of significant locations for a device? Significant locations are defined as coordinates more than 100 metres. How would you store historical data in a more cost effective way? How would you scale the system and what to watch out for when scaling out. What would you consider in deploying this solution in the cloud (AWS)?
Advanced questions
How to capture component errors in react without breaking the whole app?
Other questions
What are your thoughts on microservices? What is your view on async vs sync in microservices? How would you approach authentication between services?