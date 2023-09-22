package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// album represents data about a record album.
type note struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

// {ID: "1", Title: "Blue Train", Body: "John Coltrane test"},
// {ID: "2", Title: "Jeru", Body: "Gerry Mulligan"},

// albums slice to seed record album data.

// var dataTest, _ = json.Marshal()
var notes = []note{

	{ID: "0", Title: "testing", Body: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"testing","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`},
	{ID: "1", Title: "Sarah Vaughan and Clifford Brown", Body: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdafsdf","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`},
}

func HomeHandler(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "Welcome to my GoLang backend!")
}

// getNotes responds with the list of all albums as JSON.
func GetNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, notes)
}

// postAlbums adds an album from JSON received in the request body.
func PostNotes(c *gin.Context) {
	var newNote note

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.BindJSON(&newNote); err != nil {
		return
	}

	// Search if Title exits

	var noteFound = false

	for i, note := range notes {

		if note.Title == newNote.Title {

			notes[i].Body = newNote.Body

			fmt.Printf("Note found!! Body %s", newNote.Body)
			noteFound = true
			break
		} else {
			fmt.Printf("%s does not match %s\n", note.Title, newNote.Title)
		}

	}

	// Add the new album to the slice.
	if !noteFound {
		notes = append(notes, newNote)

	}
	c.IndentedJSON(http.StatusCreated, newNote)
}

// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func GetNoteByID(c *gin.Context) {
	id := c.Param("id")

	// Loop through the list of albums, looking for
	// an album whose ID value matches the parameter.
	for _, a := range notes {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
