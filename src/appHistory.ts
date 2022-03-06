import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const navigate = (url: string) => {
  history.push(process.env.PUBLIC_URL + url)
}

export default history;