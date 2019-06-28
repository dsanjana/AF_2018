import React, { Component } from 'react';
import axios from 'axios';

export default class CourseList extends Component {
    constructor() {
        super()

        this.state = {
            courses: [],
            currentStatus: false,
            selectedCourse: '',
            subjectIdSetForSelectedCourse: [],
            selectedCourseName: '',
            subjectName: '',
            subjectListForSelectedCourse: [],
            subjectAmount: '',
            subjectAmountsForSelectedCourse: []
        }

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
    }

    onChangeStatus() {
        this.setState({
            currentStatus: true
        })

        //get details about selected course(subjects)
        axios.get('http://localhost:3000/api/course/getCourses/' + this.state.selectedCourse).then(
            selectedCourses => {
                this.setState({
                    selectedCourseName: selectedCourses.data.name,
                    subjectIdSetForSelectedCourse: selectedCourses.data.subjects
                });

                console.log(this.state.subjectIdSetForSelectedCourse)
                console.log(this.state.selectedCourseName)

                this.state.subjectIdSetForSelectedCourse.map((subjectId) => {

                    console.log(subjectId);

                    //get subject details for given id(subject name)
                    axios.get('http://localhost:3000/api/subject/getSubject/' + subjectId).then(
                        selectedSubject => {
                            this.setState({
                                subjectName: selectedSubject.data.name,
                                subjectAmount: selectedSubject.data.amount,
                                subjectListForSelectedCourse: this.state.subjectListForSelectedCourse.concat([selectedSubject.data]),
                                subjectAmountsForSelectedCourse: this.state.subjectAmountsForSelectedCourse.concat([selectedSubject.data.amount])
                            });
                            console.log(this.state.subjectName)
                            console.log(this.state.subjectListForSelectedCourse)
                        }
                    )
                }
                );
            }
        )
        console.log(this.state.subjectIdSetForSelectedCourse)
    }

    componentDidMount() {
        //get details of all the courses
        axios.get('http://localhost:3000/api/course/getCourses').then(
            courses => {
                this.setState({
                    courses: courses.data
                });
            }
        )
    }

    onChangeComboBoxValue(e) {
        this.setState({
            selectedCourse: e.target.value
        })
    }

    render() {

        if (!this.state.currentStatus) {
            return (
                <div className="container">
                    <div className="form-group col-md-4">
                        <label>Course List</label>
                        <select className="form-control" value={this.state.selectedCourse} onChange={this.onChangeComboBoxValue}>
                            <option>Select your Course</option>
                            {this.state.courses.map(course => {
                                return (
                                    <option>{course.name}</option>
                                )
                            }
                            )}
                        </select><br />
                        <button type="button" onClick={this.onChangeStatus} class="btn btn-info">Get Subjects</button><br /><br />
                    </div>

                    <table className="table">
                        <thead>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Pass Mark</th>
                            <th>Lecure In Charge</th>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(course => {
                                    return (
                                        <tr key={course._id}>
                                            <td>{course.name}</td>
                                            <td>{course.code}</td>
                                            <td>{course.passMark}</td>
                                            <td>{course.lectureinCharge}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }

        else if (this.state.currentStatus) {
            return (
                <div>
                    <h1>Subjects List for {this.state.selectedCourse} Course</h1><br />
                    <table className="table">
                        <thead>
                            <th>Subject</th>
                            <th>Amount</th>

                            <th>description</th>

                            {/*<th>Amount</th>*/}
                        </thead>
                        <tbody>

                            {this.state.subjectListForSelectedCourse.map(subjectList => {
                                return (
                                    <tr>
                                        <td>{subjectList.name}</td>
                                        <td>{subjectList.amount}</td>
                                        <td>{subjectList.description}</td>


                                    </tr>
                                )
                            })}

                            {/*{this.state.subjectAmountsForSelectedCourse.map(subjectAmounts => {*/}
                                {/*return (*/}
                                    {/*<tr>*/}
                                        {/*<td>{subjectAmounts}</td>*/}
                                    {/*</tr>*/}
                                {/*)*/}
                            {/*})}*/}

                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

