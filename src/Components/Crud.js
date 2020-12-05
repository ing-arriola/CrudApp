import React, { useState, useEffect } from "react";
import { Col, Row, ListGroup, Container, Button } from "react-bootstrap";
const Crud = () => {
  const originalUsers = [
    { name: "Hans", lastname: "Emil" },
    { name: "Max", lastname: "Mus" },
    { name: "Roman", lastname: "Tisc" },
  ];
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [holder, setHolder] = useState(originalUsers);

  const [users, setUsers] = useState(originalUsers);

  const filterPrefix = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = users.filter((user) =>
      (user.name + user.lastname).toLowerCase().includes(searchTerm)
    );
    setUsers(results);
    if (searchTerm === "") {
      setUsers(holder);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const addNewUser = () => {
    if (newName && newLastName) {
      const lastUsers = users;
      setUsers([...lastUsers, { name: newName, lastname: newLastName }]);
      setHolder([...lastUsers, { name: newName, lastname: newLastName }]);
    }
  };

  const deleteUser = () => {
    setUsers(users.filter((item, index) => index !== selected));
    setHolder(users.filter((item, index) => index !== selected));
  };

  const activeSelected = (index) => {
    setSelected(index);
  };

  const updateUser = () => {
    let newArr = [...users];
    newArr[selected] = { name: newName, lastname: newLastName };
    setUsers(newArr);
    setHolder(newArr);
  };

  return (
    <Container className="justify-content-center  mt-5  ">
      <Row className="justify-content-center mb-2 ">
        <label>Filter prefix: </label>
        <input onChange={filterPrefix}></input>
      </Row>
      <Row className="justify-content-center">
        <Col lg={3}>
          <ListGroup className="overflow-auto">
            {users.map((user, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => activeSelected(index)}
                className={`${index === selected ? "active" : ""}`}
              >
                {user.lastname},{user.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={2}>
          <label>Name:</label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          ></input>
          <label>Lastname:</label>
          <input
            onChange={(e) => setNewLastName(e.target.value)}
            value={newLastName}
          ></input>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 ">
        <Button onClick={addNewUser} className="mr-3">
          Create
        </Button>
        <Button onClick={updateUser} className="mr-3">
          Update
        </Button>
        <Button onClick={deleteUser} className="mr-3">
          Delete
        </Button>
      </Row>
    </Container>
  );
};

export default Crud;
//d-flex flex-column
