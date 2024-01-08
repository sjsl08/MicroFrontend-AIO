
import { publicApiFunction, globalState, obj,pubSub } from "@app/utils"
import { ChangeEvent, useEffect, useState } from "react";
import classes from './root.component.module.css';

export default function Root(props) {

  const [data, setData] = useState({ name: "", token: "" })

  useEffect(() => {
    setData(obj)
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData({ ...data, name: e.target.value })
    obj.name = e.target.value
    console.log(obj);

  }

  return (<section className={classes.border}>


    {props.name} is mounted!
    <br />
    <button onClick={() => { publicApiFunction("react") }}>Click</button>
    <br />
    <input type="text" value={obj.name} onChange={(e) => { handleChange(e) }} placeholder="enter value" />



    <button onClick={() => { obj.token = crypto.randomUUID() }}>GENERATE TOKEN</button>
    <button onClick={() => { pubSub.commonData.pubCommonData("common","angular")}}>GENERATE TOKEN</button>

  </section>);
}
