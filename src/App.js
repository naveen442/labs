import React from "react";
import Row from 'react-bootstrap/Row';
// import component :point_down:
import Drawer from "react-modern-drawer";
import Form from 'react-bootstrap/Form';

import axios from 'axios';
//import styles :point_down:
import "react-modern-drawer/dist/index.css";
import Button from 'react-bootstrap/Button';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [schema, setSchema] = React.useState("");

  const [segmentname, setSegmentname] = React.useState("");
  const [schemaselectlist, setSchemaselectlist] = React.useState([
    {
      value: "first_name",
      name: "First Name"
    },
    { value: "last_name", name: "Last Name" },
    { value: "gender", name: "Gender" },
    { value: "age", name: "Age" },
    { value: "account_name", name: "Account Name" },
    { value: "city", name: "City" },
    { value: "state", name: "State" }
  ]);
  const [schemalist, setSchemalist] = React.useState([]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleAddschema = () => {
    if (schema !== "") {
      let schemadata = [...schemalist];

      schemadata.push({ value: schema });
      setSchema("");
      setSchemalist(schemadata);
    }
  };
  const handleSave = () => {
    var result = [];
    for (let i = 0; i < schemalist.length; i++) {
      if (schemalist[i].value === "first_name") {
        result.push({ first_name: "First name" });
      } else if (schemalist[i].value === "first_name") {
        result.push({ first_name: "First Name" });
      } else if (schemalist[i].value === "last_name") {
        result.push({ last_name: "Last Name" });
      } else if (schemalist[i].value === "gender") {
        result.push({ gender: "Gender" });
      } else if (schemalist[i].value === "age") {
        result.push({ age: "Age" });
      } else if (schemalist[i].value === "account_name") {
        result.push({ account_name: "Account name" });
      } else if (schemalist[i].value === "city") {
        result.push({ city: "City" });
      } else if (schemalist[i].value === "state") {
        result.push({ state: "State" });
      }
    }
    const dataTosend = {
      segment_name: segmentname,
      schema: result

    };
    console.log(dataTosend, "dataTosend");
    axios.post("https://webhook.site/022815ce-6411-42bc-aae0-0a365d1014a3", dataTosend).then((response) => {
      console.log("data", response);
    }).catch(err => console.log(err));
  };
  return (
    <>
      <Button onClick={toggleDrawer}>Save segment</Button>
      <Drawer style={{ width: "50%" }}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <div style={{ marginLeft: "30px" }}>
          <div>Enter the Name of the Segment</div>
          <input
            type="text"
            value={segmentname}
            onChange={(e) => setSegmentname(e.target.value)}
            placeholder="Name of the Segment"
          />
          <div>
            To save your segment,you need to add the schemas to build the query
          </div>
          {console.log(schemalist, "schemalist")}
          {schemalist && schemalist.length > 0 ? (
            <div style={{ border: "1px solid blue" }}>
              {schemalist.map((element, ind) => (
                <>
                  {" "}
                  <Row style={{ marginLeft: "0px", }}>
                    <Form.Select
                      key={ind}
                      style={{ marginBottom: "10px", marginTop: "10px", width: "50%" }}
                      id="Add chema to segment"
                      value={element.value}
                      onChange={(e) => {
                        console.log(e.target);
                        let schemadata = [...schemalist];
                        schemadata[ind].value = e.target.value;

                        setSchemalist(schemadata);
                      }}
                    >
                      {schemaselectlist.map((el, i) => (
                        <option value={el.value} key={i}>
                          {el.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      style={{ marginLeft: "30px", marginTop: "15px", width: "50px", height: "30px" }}
                      onClick={(e) => {
                        let listdata = [...schemalist];
                        listdata.splice(ind, 1);
                        console.log(ind, "ind", listdata);
                        setSchemalist(listdata);
                      }}
                    >
                      -
                    </Button>
                  </Row>
                  <br />
                </>
              ))}
            </div>
          ) : (
            ""
          )}

          <Form.Select
            style={{ width: "50%" }}
            value={schema}
            onChange={(e) => {
              setSchema(e.target.value);
            }}
          >
            <option value="" name="">
              Add schema to segment
            </option>
            {schemaselectlist.map((elem, i) => (
              <option value={elem.value} key={i}>
                {elem.name}
              </option>
            ))}
          </Form.Select>
          <a href="#" onClick={handleAddschema}>
            +Add new schema
          </a><br /><br />
          <Button onClick={handleSave}>Save the segment</Button>
        </div>
      </Drawer>
    </>
  );
};

export default App;