package main

import (
	"log"
	"fmt"
	"io/ioutil"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])

	body, _ := ioutil.ReadAll(r.Body)
	ioutil.WriteFile("01.gif", body, 0666)
	fmt.Printf("Image saved!\n")
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", handler)

	log.Println("Listening...")
	http.ListenAndServe(":8080", nil)
}
