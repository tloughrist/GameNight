# GameNight Scheduling App
An application to organize your game nights. 

## Description
I like to host board game nights and I have several groups of friends I game with. Who is attending which games what nights can sometimes get confusing. This app is designed as a way of organizing these game nights, keeping track of who is attending, how certain they are that they will attend, who has been invited to game nights, etc.

## Demo
[![A link to a demo video](https://timloughrist.files.wordpress.com/2023/01/ksnip_20230124-095256.png)](...)

Click the image above to watch a video demonstrating the app.

## Installation
The current version of the app uses JavaScript/React for the frontend and Ruby/Active Record/Sinatra for the backend.

The repository for this app can be found [HERE](https://github.com/tloughrist/phase-4-project).

## Usage

**Signup/Login/Profile/Logout/Delete Account:** This app requires users to signup and login. Note that passwords must be at least eight characters long. You can edit your user information, including your password, in your profile. Your profile is also where you'll be able to logout or delete your account.

**Friends:** On the friends page all of your existing friendships and pending friend requests will be displayed. If you don't have any friends yet, search the user database to find someone you know and then send them a friend request. When they accept it, they will appear on your friend page. If you want to terminate a friendship, you can unfriend a user.

**Game Nights:** On the game nights page all of the game nights you've created, the game nights you're attending, and the game nights you've been invited to will be displayed. Once you've created a game night you can invite any of your friends to attend it. When they accept, this will be indicated on the game night card along with their degree of certainty that they will attend. You can uninvite users or revoke their attendance if you so choose. You are also able to edit the game nights or delete a game night entirely.

## Support
If you have any questions about the app or suggestions, please send me an email at tim.loughrist@gmail.com.

## Roadmap
In the future, I'd like to add the following features:

1. Include a messaging function
2. Include email notifications to let you know when you've received invitations, friend requests, or when a game night is approaching
3. Permit recurring game nights

## Contributing
If anyone wants to fork this repo and work on the app, I'd love to see what you do with it!

## Authors and acknowledgment
I've been lucky to have the help of instructors at the [Flatiron coding bootcamp](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron&uqaid=513747011248&CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE&gclid=CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE). I also want to thank everyone I've played board games with for inspiring this app.
