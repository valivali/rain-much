import { Router } from "express"
import weatherController from "../controllers/weatherController.js"

const router = Router()

router.get("/forecast", (req, res) => {
  void weatherController.getForecast(req, res)
})

router.get("/hourly-precipitation", (req, res) => {
  void weatherController.getHourlyPrecipitation(req, res)
})

export default router

