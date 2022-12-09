import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import {
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firestorage";

function Home() {
  const [insectList, setInsectList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const list = getDocs(doc("insectList")).data();
    setInsectList(list);
  }, []);

  const searchResults = insectList.filter((insect) =>
    insect.name.toLowerCase().includes(search)
  );

  const deleteInsect = (insect) => {
    deleteDoc(doc("insectList", insect.id));

    const newArray = insectList.filter((bug) => bug.id !== insect.id);
    setInsectList(newArray);
  };

  return (
    <>
      <main>
        <h2>Insect Database</h2>
        <label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
        </label>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Uglyness</th>
              <th>Annoyance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {search
              ? searchResults.map((insect) => {
                  return (
                    <tr key={insect.id}>
                      <td>{insect.name}</td>
                      <td>{insect.uglyness}</td>
                      <td>{insect.annoyance}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            navigate(`/${insect.id}/edit`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            deleteInsect(insect);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : insectList.map((insect) => {
                  return (
                    <tr key={insect.id}>
                      <td>{insect.name}</td>
                      <td>{insect.uglyness}</td>
                      <td>{insect.annoyance}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            navigate(`/${insect.id}/edit`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            deleteInsect(insect);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </main>
      <nav>
        <Link to="/new">
          <button>New Insect</button>
        </Link>
      </nav>
    </>
  );
}

function NewInsect() {
  const [name, setName] = useState("");
  const [uglyness, setUglyness] = useState("");
  const [annoyance, setAnnoyance] = useState("");
  const navigate = useNavigate();

  const createInsect = () => {
    addDoc(doc("insectList"), {
      name: name,
      uglyness: uglyness,
      annoyance: annoyance,
    });
    navigate("/");
  };

  return (
    <>
      <main>
        <h2>New Insect</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createInsect();
          }}
        >
          <label>
            {" "}
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Uglyness{" "}
            <select
              value={uglyness}
              onChange={(e) => {
                setUglyness(e.target.value);
              }}
            >
              <option value="Cute">Cute</option>
              <option value="Regular">Regular</option>
              <option value="Ugly">Ugly</option>
              <option value="Extremely ugly">Extremely ugly</option>
              <option value="What in God's name is that?">
                What in God's name is that?!
              </option>
            </select>
          </label>
          <label>
            Annoyance{" "}
            <select
              value={annoyance}
              onChange={(e) => {
                setAnnoyance(e.target.value);
              }}
            >
              <option value="None">None</option>
              <option value="Regular">Regular</option>
              <option value="Big">Big</option>
              <option value="Huge">Huge</option>
              <option value="Kill it or kill me!">Kill it or kill me!</option>
            </select>
          </label>
          <button>Create</button>
        </form>
      </main>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
    </>
  );
}

function EditInsect() {
  const [name, setName] = useState("");
  const [uglyness, setUglyness] = useState("");
  const [annoyance, setAnnoyance] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const insect = getDoc(doc("insectList", params.id)).data();
    setName(insect.name);
    setAnnoyance(insect.annoyance);
    setUglyness(insect.uglyness);
  }, []);

  const editInsect = (name, annoyance, uglyness) => {
    updateDoc(doc("insectList", params.id), {
      name: name,
      annoyance: annoyance,
      uglyness: uglyness,
    });
    navigate("/");
  };

  return (
    <>
      <main>
        <h2>New Insect</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editInsect(name, annoyance, uglyness);
          }}
        >
          <label>
            {" "}
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Uglyness{" "}
            <select
              value={uglyness}
              onChange={(e) => {
                setUglyness(e.target.value);
              }}
            >
              <option value="Cute">Cute</option>
              <option value="Regular">Regular</option>
              <option value="Ugly">Ugly</option>
              <option value="Extremely ugly">Extremely ugly</option>
              <option value="What in God's name is that?">
                What in God's name is that?!
              </option>
            </select>
          </label>
          <label>
            Annoyance{" "}
            <select
              value={annoyance}
              onChange={(e) => {
                setAnnoyance(e.target.value);
              }}
            >
              <option value="None">None</option>
              <option value="Regular">Regular</option>
              <option value="Big">Big</option>
              <option value="Huge">Huge</option>
              <option value="Kill it or kill me!">Kill it or kill me!</option>
            </select>
          </label>
          <button>Save</button>
        </form>
      </main>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<NewInsect />} />
        <Route path="/:id/edit" element={<EditInsect />} />
      </Routes>
    </div>
  );
}

export default App;
