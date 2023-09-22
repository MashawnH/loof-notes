package main

import (
	"backend/handlers" // Import your route handlers
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Define your routes
	// http.HandleFunc("/", handlers.HomeHandler)
	// http.HandleFunc("/api/data", handlers.DataHandler)

	router := gin.Default()
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	router.GET("/", handlers.HomeHandler)
	router.GET("/notes", handlers.GetNotes)
	router.GET("/notes/:id", handlers.GetNoteByID)
	router.POST("/notes", handlers.PostNotes)

	// Start the server
	// port := ":8080"
	// fmt.Printf("Server is listening on %s\n", port)
	// if err := http.ListenAndServe(port, nil); err != nil {
	// 	panic(err)
	// }

	router.Run("localhost:8080")
}
