# User Analyzer
"Build a program using React Native to analyze app usage data for a hypothetical menu planning calendar app. On any day, a user can plan multiple meals, and each meal may have multiple dishes. The program you build will analyze how engaged users are with the app."

# User Interface
I have checked the application in Xiaomi Note 9 Pro and it appears to be working fine. I have not been able to test it on any iOS device.

# Assumptions
I have assumed that: 
* 'bored' status refers to users who had 0 to 4 meals in the time period from infinity to the start date of the specified period, and had at least 1 meal in their lifetime
    
* some user might be there who has never had a single meal. These users will not appear in the app.

* 'Search by name' refers to searching only in the filtered and not universal.

* a Modal Component backed by Redux will be the perfect choice for 'Edit Filter UI'.

* at least 1 item should be checked from the 'status' checkboxes in order to view filter result.
 
