package main

import (
	// Import your route handlers
	"backend/internal/database"
	"backend/internal/routes"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const (
	host     = "db"
	port     = 5432
	user     = "loofnote"
	password = "loofnote"
	dbname   = "loofnote_db"
)

var db *sql.DB

func main() {

	// Initialize the database
	db, err := database.InitDB()
	if err != nil {
		fmt.Println("Error initializing the database:", err)
		return
	}

	// Initialize the Gin router and routes
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

	routes.InitRoutes(router, db)

	// Start the server
	router.Run("0.0.0.0:4000")
}
