Tasks

Set up environment

Create a virtual environment in your project folder and install the dependencies listed in requirements.txt. Set environmental variables.

Having the properly filled .env file allows you to run data/data_inserter.py from PyCharm to create your database.



Most rated shows

Create a page accessible from the path /shows/most-rated, where the fifteen highest rated shows are displayed in a table, showing the highest rated one first. Display the title (make it a link to the /show/<id> URL), release year, average runtime length, rating (formatted as "9.2"), genres (in alphabetical order, separated by commas), and a link to the trailer and the homepage of the show (or the "No URL" string if there is no URL associated).
Opening the website locally through a browser on the /shows/most-rated URL shows a page with a Codecool logo and the "Codecool Series Database" title in the top left corner, a "Register" and "Login" button in the top right corner, a main heading centered on the top, and a table on a card with white background.

The page title (shown on the browser tab) and the main heading (centered on the top) is "Shows".
The table on the page has the following column headers: Title, Year, Runtime (min), Rating, Genres, Trailer, Homepage.
The table on the page has fifteen rows. Each row contains valid data according to the column headers.
The contents of the title column are links to the page of the show (/show/<id>).
The contents of the rating column contents are formatted as "9.2".
The contents of the genres column are separated by commas (such as "Action, Adventure, Drama, War")
The contents of the trailer column are links to the YouTube trailer of the show. If there is no trailer for the show, the "No URL" string is displayed (such as for the show Firefly).
The contents of the homepage column are links to the homepage of the show. If there is no homepage for the show, the "No URL" string is displayed (such as for the show Firefly).
Table contents are ordered by the rating column, in descending order (first one is the highest rated).



Pagination

Create a pagination to the table on the /shows/most-rated route to allow the user to see the lower rated shows.

Opening the website locally through a browser on the /shows/most-rated URL displays a page with an extra card at the bottom with page numbers and arrows (such as "« 1 2 3 4 5 6 7 8 »").
The page number of the current page is highlighted.
The page numbers function as links: clicking them changes the table contents to another fifteen rows that corresponds with the page number (so all shows in the database can be browsed if the user visits all pages).
Left («) and right (») arrows work as links, clicking them shows the previous and next page, respectively (except for the first and last pages where the left and right arrow does nothing, respectively).
Clicking page numbers or arrows keeps the order of shows in the table.



OPTIONAL TASK: Show only five page numbers

In the pagination of the /shows/most-rated route, display only five page numbers, the current page, and two other pages in each direction, except for the beginning and the end, where the actual page number is not the middle one. The arrows must also function.
Opening the website locally through a browser on the /shows/most-rated URL displayes a page with an extra card at the bottom with five page numbers and arrows (such as "« 1 2 3 4 5 »").
The active page number is in the middle and the previous and next 2 are shown as well (such as "« 5 6 (7) 8 9 »"); for the first and last two pages, the active page number is on the side (such as "« (1) 2 3 4 5 »", "« 64 65 66 67 (68) »").
Clicking the left («) and right (») arrows shifts the shown page numbers to the left or right, respectively (except for the first and last two pages).



Sortable columns

Make the table on the /shows/most-rated page sortable by the title, year, runtime, and rating columns. The user can sort the table by clicking the column header (by default, the table is sorted by rating). If the user clicks the already selected column, the sorting order is reversed. Indicate the sorting order next to the column header with arrows (such as ⇩, ⇧). Make this page accessible on the path /shows as well.
Opening the website locally through a browser on the /shows or /shows/most-rated URL shows a page with a table where clicking the title, year, runtime, or rating column header sorts the table according to the column clicked.
The sorting order is indicated by an arrow (such ⇩, ⇧) next to the column header by which the table is sorted.
Clicking the header of a column that is already sorted reverses the sorting order.



Show detailed view
(examle: /show/1390)

Create a new page, accessible from the path /show/<id>, where the user can see the following details of a TV show: title, average runtime length, rating, genres (in the same way as in the shows list), overview, and the name of the top three actors appearing in the show. Use the provided layout that can be seen on the /design page (detailed view). Include the trailer (if there is one) as an embedded Youtube video.

Opening the website locally through a browser on the /show/<id> (where id is a valid show ID) displays a page with a Codecool logo and the "Codecool Series Database" title in the top left corner, a "Register" and "Login" button in the top right corner, and a card with white background containing the details of a show.

The page title (shown on the browser tab) and the card title are both the title of the show.
The detailed layout from the /design page is used.
Average runtime is shown in the following format: "1h 42min" (if it is less than an hour, the hour part is not shown, if it is exactly an hour, the minute part is not shown).
Rating is formatted as "9.2" and a little star (such as "☆").
The list of genres is separated by commas (such as "Action, Adventure, Drama, War").
The list of actors is separated by commas (such as "Bryan Cranston, Anna Gunn, Aaron Paul").
The trailer is shown as an embedded YouTube video if there is one. If there is no trailer for the show (such as Firefly), nothing is displayed.



List seasons

Create a new card on the detailed view of the show, where the seasons are displayed in a table. The column number, the title, and the overview is ordered by the number of the season.

Opening the website locally through a browser on the /show/<id> (where id is a valid show ID) shows a page with an extra card at the bottom with a table.

The title of the card is "Seasons".
The table on the page has the following column headers: (Empty for the number of the season), Title, Overview.
The table on the page has rows and each row contains valid data according to the column headers.



OPTIONAL TASK: List actors
(/actors)

Create an actors route that displays on each line the first name of the first one hundred actors (ordered by birth date). When you click a name, a list is displayed, with all the shows the actor played in. Think of a solution which puts a minimum use on the database resources and at the same time is not too complicated.

When the page is first loaded, the first names of one hundred actors are displayed.
When clicking an actor, a list is displayed, with all the shows the actor played in.
When clicking an actor with the list already displayed, the shows are removed from the DOM.
When the list of an actor is displayed, clicking a different actor removes the list of the first actor from the DOM, and display the list of the second actor.


OPTIONAL TASK: Show ratings
(/ratings)

Create a ratings route that displays in a table the names of the first ten shows (ordered by actor count descending) and by how much each show is above or below the average rating of all the shows in the DB.

The show Bleach is above the average rating by +0.47.
When the page is first loaded, there are ten show names.


OPTIONAL TASK: Ordered shows
(/ordered-shows)

Create an ordered-shows route that displays the names of the first ten shows (ordered by episode count) and their rounded rating in * (3.7 is ****). Clicking the name header of the table in which the shows are displayed toggles the ascending or descending order of the shows from the database (when descending that last 10 shows ordered from the DB).

Clicking the name header of the table changes the shows displayed in the table.
Clicking the name header a second time changes the shows displayed in the table again.



OPTIONAL TASK: Filter actors
(/filter-actors)

Create a filter-actors route which has two input boxes, a select type that contains all the genres, and a text type that contains names. After changing any content in any input, instantly (without page reload) display the first twenty actors that played in those genres and have the specified characters in their names. When the page is loaded, the select box is set to the first alphabetical genre ('Action') and the input text box is empty.

After typing a character in the text input box, the displayed actors are updated on the page.
When the developer tools console tab is opened in the browser and the user writes some text and then deletes all text from the text input box, no errors appear in the console.
When the page is first loaded, the action genre is already chosen, the text input box is empty, and twenty actors are displayed.


