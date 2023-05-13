import express from "express"
import mongoose from "mongoose"
import path from "path"
import exphbs from "express-handlebars"
import dotenv from "dotenv"

import router from "./routes/todos.js"

dotenv.config()

const PORT = process.env.PORT || 3000
const dbUser = process.env.DB_USER_NAME
const dbPassword = process.env.DB_PASSWORD
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(router)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8xcll9u.mongodb.net/`
    )
    app.listen(PORT, () => {
      console.log("Server has been started...")
    })
  } catch (error) {
    console.log(error)
  }
}

start()
