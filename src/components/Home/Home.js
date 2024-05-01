import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePeople } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Home.module.css";
import { getAllJobs } from "../../api/job";

export default function Home() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState();
    const [token] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const fetchAllJobs = async () => {
        const result = await getAllJobs({ title: title, skills: skills });
        setJobs(result?.data);
    };

    const handleSkill = (event) => {
        const newArr = skills.filter((skill) => skill === event.target.value);
        if (!newArr.length) {
            setSkills([...skills, event.target.value]);
        }
    };

    const removeSkill = (selectedSkill) => {
        const newArr = skills.filter((skill) => skill !== selectedSkill);
        setSkills([...newArr]);
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    return (
        <>
            <div className={styles.header}>
                {/* <img src={shape1} alt="shape1" className={styles.shape1} /> */}
                {/* <img src={shape2} alt="shape2" className={styles.shape2} /> */}
                <h3>Jobfinder</h3>
                <div className={styles.btnGroup}>
                    {token ? (
                        <button className={styles.login} onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className={styles.login}>Login</button>
                            <button className={styles.register}>
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.containerTop}>
                    <CiSearch />
                    <input
                        className={styles.inputTop}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="search"
                        placeholder="Type any job title"
                    />
                </div>
                <div className={styles.containerBottom}>
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="remote"
                    >
                        <option disabled selected value="">
                            Skills
                        </option>

                        {DEFAULT_SKILLS?.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>

                    {skills?.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>
                                {skill}
                                <span
                                    onClick={() => removeSkill(skill)}
                                    className={styles.cross}
                                >
                                    ╳
                                </span>
                            </span>
                        );
                    })}
                    <div>
                        <button
                            onClick={fetchAllJobs}
                            className={styles.filter}
                        >
                            Apply Filter
                        </button>
                        <button
                            onClick={() => navigate("/job-post")}
                            className={styles.job}
                        >
                            + Add Job
                        </button>
                        <button
                            onClick={() => {
                                setSkills([]);
                                setTitle("");
                                fetchAllJobs();
                            }}
                            className={styles.clear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className={styles.bottom}> */}
            {jobs.map((data) => {
                return (
                    <div key={data._id} className={styles.list}>
                        <div className={styles.listLeft}>
                            <div>
                                <img
                                    className={styles.logo}
                                    src={data?.logoUrl}
                                />
                            </div>
                            <div className={styles.infoLeft}>
                                <p className={styles.position}>{data.title}</p>
                                <p className={styles.extraInfo}>
                                    <MdOutlinePeople
                                        style={{
                                            fontSize: "20px",
                                            color: "grey",
                                            marginTop: "2px",
                                        }}
                                    />

                                    <span className={styles.greyText}>
                                        11-50
                                    </span>
                                    <span className={styles.greyText}>
                                        ₹ {data.salary}
                                    </span>
                                    <span className={styles.greyText}>
                                        {data.location}
                                    </span>
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.redText}>
                                        {data.remote}
                                    </span>
                                    <span className={styles.redText}>
                                        {data.jobType}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={styles.skills}>
                                {data?.skills?.map((skill) => {
                                    return (
                                        <span
                                            className={styles.skill}
                                            key={skill}
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={styles.btnGroup2}>
                                {token && (
                                    <button
                                        onClick={() => {
                                            navigate("/job-post", {
                                                state: {
                                                    jobDetails: data,
                                                    edit: true,
                                                },
                                            });
                                        }}
                                        className={styles.view}
                                    >
                                        Edit Jobs
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        navigate(`/job-details/${data._id}`)
                                    }
                                    className={styles.view}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
