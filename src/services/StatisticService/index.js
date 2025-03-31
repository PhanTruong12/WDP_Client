import http from "../index"
<<<<<<< HEAD
 import {
   apiStatisticServiceBooking,
   apiStatisticTotalAccount,
   apiStatisticTotalBooking,
   apiStatisticTotalBookingByBarber
 } from "./urls"
 
 const statisticTotalBookingByBarber = () => http.get(apiStatisticTotalBookingByBarber)
 const statisticServiceBooking = body => http.post(apiStatisticServiceBooking, body)
 const statisticTotalBooking = () => http.get(apiStatisticTotalBooking)
 const statisticTotalAccount = () => http.get(apiStatisticTotalAccount)
 
 const StatisticService = {
   statisticTotalBookingByBarber,
   statisticServiceBooking,
   statisticTotalBooking,
   statisticTotalAccount
 }
 
 export default StatisticService
=======
import {
  apiStatisticServiceBooking,
  apiStatisticTotalAccount,
  apiStatisticTotalBooking,
  apiStatisticTotalBookingByBarber
} from "./urls"

const statisticTotalBookingByBarber = () => http.get(apiStatisticTotalBookingByBarber)
const statisticServiceBooking = body => http.post(apiStatisticServiceBooking, body)
const statisticTotalBooking = () => http.get(apiStatisticTotalBooking)
const statisticTotalAccount = () => http.get(apiStatisticTotalAccount)

const StatisticService = {
  statisticTotalBookingByBarber,
  statisticServiceBooking,
  statisticTotalBooking,
  statisticTotalAccount
}

export default StatisticService
>>>>>>> f1aea1964bc541c50cdf092973ca1d878024f2ec
