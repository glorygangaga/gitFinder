import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { gitHubActions } from "../store/github/github.slice"


const actions = {
  ...gitHubActions
}

export const useAction = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}