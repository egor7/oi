package main

import (
	"log"
	"fmt"
	"io/ioutil"
	"net/http"
)

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])

	body, _ := ioutil.ReadAll(r.Body)
	ioutil.WriteFile("01.png", body, 0666)
	fmt.Printf("Image saved!\n")
}

func main() {
    http.HandleFunc("/", HelloServer)

    log.Println("Listening...")

    err := http.ListenAndServeTLS(":443", "server.crt", "server.key", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
