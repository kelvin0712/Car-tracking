
Each driver will be carrying a device (android or iOS) and will run our app. Our app will submit location data every minute. Each device has the following attributes (at least)
device OS (ios/android) device OS version device location
Before driving, driver then assigns themselves to a vehicle. Each available vehicle has the following attributes (at least)
vehicle reg number vehicle type

# The solution will need to address the following requirements

- We need to know where the driver is at any point in time, __being able to search for them by name__ (or location (map window)).
- We need to know __where the driver has been__ for the __whole day__(historical) and __current location__.
- We need to know who has been driving a particular vehicle and where they have been all day. (__search by vehicle__)
- Need to __capture all activities__ and store them in an audit log for security and auditing perspective.

The architecture including database/storage structure solution design is up to you.

We expect you to build __a set of API__ to handle the specified requirements.
Feel free to add more data fields to capture - what you think is necessary - to complete the solution.
Location data is captured in a geojson format (Point type) The outcome we are expecting:
An implementation of the solution in the language of your choosing, preferred to be in javascript, typescript with nodejs/mongodb/postgresql.
Your approach and implementation on testing. Your scaling out approach.
Come up with the results that you think may make sense for the business/view
Frontend challenges
A UI (preferred react framework) - that calls the backend you develop to answers the requirements above. Feel free to design the UX.
- Build a reusable __table component__ (without a third party library)
- Result can be displayed in a __table__ or __map view__ (do timebox it)
- Front end testing approach
Feel free to ask questions by sending an email to us.

# In-person challenges Challenges

How would you design the data model to store the information? Feel free to ask questions.
How would you design the APIs for the above requirements?
How would you design this in a microservice architecture?
How would you retrieve a list of significant locations for a device? Significant locations are defined as coordinates more than 100 metres.
How would you store historical data in a more cost effective way?
How would you scale the system and what to watch out for when scaling out.
What would you consider in deploying this solution in the cloud (AWS)?

# Idea 
1. Map page: 
- Display all the drivers are working on map 
- If user click the driver => display the driver information 
- If click the information => personal page display more information 
2. 