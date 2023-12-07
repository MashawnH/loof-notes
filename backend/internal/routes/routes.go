package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// album represents data about a record album.
type note struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

// Note represents a note in the note app
type Note struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

// String returns a string representation of the Note
func (n Note) String() string {
	return fmt.Sprintf("ID: %d, Title: %s, Body: %s", n.ID, n.Title, n.Body)
}

func notesToString(notes []Note) string {
	var result string

	for _, note := range notes {
		result += note.String() + "\n"
	}

	return result
}

// {ID: "1", Title: "Blue Train", Body: "John Coltrane test"},
// {ID: "2", Title: "Jeru", Body: "Gerry Mulligan"},

// albums slice to seed record album data.

// var dataTest, _ = json.Marshal()
var notes = []note{

	{ID: "0", Title: "testing", Body: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"testing","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`},
	{ID: "1", Title: "Sarah Vaughan and Clifford Brown", Body: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdafsdf","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`},
}

// {"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"testing","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}
// "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"testing\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}"

// InitRoutes initializes the routes for the note app
func InitRoutes(router *gin.Engine, db *gorm.DB) {

	router.GET("/", HomeHandler)
	router.GET("/notes", getNotes(db))
	router.POST("/notes", postNote(db))
	router.DELETE("/notes", deleteFirstNote(db))

	router.GET("/notes/:id", GetNoteByID)
}

func HomeHandler(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "Welcome to my GoLang backend!")
}

func getNotes(db *gorm.DB) gin.HandlerFunc {

	fn := func(c *gin.Context) {
		notes, err := getAllNotes(db)

		if err == nil {
			c.JSON(200, notes)
		}
	}
	return gin.HandlerFunc(fn)
}

// getAllNotes retrieves all notes from the database
func getAllNotes(db *gorm.DB) ([]Note, error) {

	var notes []Note
	if err := db.Find(&notes).Error; err != nil {
		fmt.Println("Error retrieving notes:", err)
		return nil, err
	}
	return notes, nil
}

func postNote(db *gorm.DB) gin.HandlerFunc {

	fn := func(c *gin.Context) {
		var newNote Note
		if err := c.BindJSON(&newNote); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request body"})
			return
		}

		fmt.Println("Note received :", newNote)

		// Create the new note in the database
		if err := db.Create(&newNote).Error; err != nil {
			c.JSON(500, gin.H{"error": "Failed to create a new note"})
			return
		}

		// Respond with the newly created note
		c.JSON(201, newNote)
	}

	return gin.HandlerFunc(fn)
}

// deleteFirstNote deletes the first note in the database
func deleteFirstNote(db *gorm.DB) gin.HandlerFunc {

	fn := func(c *gin.Context) {
		var firstNote Note

		// Find the first note
		result := db.First(&firstNote)
		if result.Error == gorm.ErrRecordNotFound {
			fmt.Println("No notes found to delete.")
			return
		} else if result.Error != nil {
			fmt.Println("Error fetching the first note:", result.Error)
			return
		}

		// Delete the first note
		db.Delete(&firstNote)
		fmt.Println("Deleted the first note.")
	}

	return gin.HandlerFunc(fn)
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
