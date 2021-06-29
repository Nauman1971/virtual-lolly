import { navigate } from "gatsby-link"
import React from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="lolliesList">

        <div className="is-flex mt-4 p-2 m-2">
          <div className="m-2">
            <Lolly
              fillLollyTop="#d52358"
              fillLollyMiddle="#e95946"
              fillLollyBottom="#deaa43"
            />
          </div>
          <div className="m-2">

            <Lolly
              fillLollyTop="red"
              fillLollyMiddle="green"
              fillLollyBottom="peru"
            />
          </div>
          <div className="m-2">
            <Lolly
              fillLollyTop="black"
              fillLollyMiddle="yellow"
              fillLollyBottom="blue"
            />
          </div>
          <div className="m-2">
            <Lolly
              fillLollyTop="orange"
              fillLollyMiddle="chartreuse"
              fillLollyBottom="rebeccapurple"
            />
          </div>
        </div>
      </div>
      <input className="button is-medium is-fullwidth is-warning" type="button"
        value="Create New Lolly"
        onClick={() => navigate("/create-lolly", { replace: true })}
      />
    </div>
  )
}
