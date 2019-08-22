import React from 'react';
import { connect } from 'react-redux'
import { HubContent } from '../../../../../core/components/hub/HubContent';
import { InputBox, SelectBox } from '../../../../../core/components';
import { getSingleQuestion, UpdateQuestion } from '../../../../redux';

class EditQuestion extends React.Component {
  state = {
    result: null,
    owner: "Admin"
  }


  async componentDidMount() {
    try {
      const result = await this.props.getSingleQuestion(this.props.match.params.id);
      this.setState(result)
      console.log(result)
    } catch (e) {
      this.setState({ error: e })
    }
  }

  onChange = (value) => {
    this.setState(value)
  }

  onChangeType = (value) => {
    this.setState(value)
  }

  onSubmitHandler = async (e) => {
    let data = {
      _id: this.state._id,
      question: this.state.question,
      category: this.state.category,
      type: this.state.type,
      owner: this.state.owner
    }
    if (this.state.type === 'objective') {
      Object.assign(data, {
        option1: this.state.option1,
        option2: this.state.option2,
        option3: this.state.option3,
        option4: this.state.option4
      })
    }
    try {
      const result = await this.props.UpdateQuestion(data);
      this.setState({
        result
      })
    } catch (e) {
      console.log(e.response.data)
      this.setState({
        result: { ...e.response.data, status: e.response.status }
      })
    }
  }

  render() {
    const category = [
      { name: "Basic", id: "basic" },
      { name: "Deep", id: "deep" },
    ];

    const type = [
      { name: "Objective", id: "objective" },
      { name: "Subjective", id: "subjective" },
    ];
    console.log(this.state)
    return (
      <HubContent title="Edit Question">
        <div className="form-group row">
          <InputBox
            label="Question"
            placeholder="Enter Question"
            onChange={this.onChange}
            field='question'
            defaultValue={this.state.question}
          />
          <SelectBox
            label="Category"
            onChange={this.onChange}
            field='category'
            data={category}
            defaultValue={this.state.category}
          />
        </div>

        <div className="form-group row">
          <InputBox
            label="Owner"
            placeholder="Enter Question"
            onChange={this.onChange}
            field='owner'
            defaultValue={this.state.owner}
          />
          <SelectBox
            label="Type"
            data={type}
            onChange={this.onChangeType}
            field='type'
            defaultValue={this.state.type}
          />
        </div>
        {this.state.type === 'objective' &&
          <React.Fragment>
            <h4>Options</h4>
            <div className="form-group row">
              <InputBox
                label="Option1"
                placeholder="Enter Option1"
                onChange={this.onChange}
                field='option1'
                defaultValue={this.state.option1}
              />
              <InputBox
                label="Option2"
                placeholder="Enter Option2"
                onChange={this.onChange}
                field='option2'
                defaultValue={this.state.option2}
              />
            </div>
            <div className="form-group row">
              <InputBox
                label="Option3"
                placeholder="Enter Option3"
                onChange={this.onChange}
                field='option3'
                defaultValue={this.state.option3}
              />
              <InputBox
                label="Option4"
                placeholder="Enter Option4"
                onChange={this.onChange}
                field='option4'
                defaultValue={this.state.option4}
              />
            </div>
          </React.Fragment>
        }


        <div className=" mt-4 ">
          <div className="w-100 mb-3">
            {this.state.result && <React.Fragment>
              {this.state.result.status === 201 && <div className="alert alert-success">Question Updated succesfully</div>}
              {/* {this.state.result.status === 201 && <div className="alert alert-danger w-100 m-0">Question created succesfully</div>} */}

              {typeof this.state.result.error === 'object' ?
                Object.values(this.state.result.error.errors).map((err, key) => {
                  return <div className="alert alert-warning">{err.message}</div>

                })
                : this.state.result.status === 501 && <div className="alert alert-warning">{this.state.result.errMessage}</div>
              }
            </React.Fragment>
            }
          </div>
          <button
            className="btn btn-primary btn-md waves-effect waves-light"
            onClick={this.onSubmitHandler}
          >Update Question</button>
        </div>
      </HubContent>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  UpdateQuestion: (payload) => dispatch(UpdateQuestion(payload)),
  getSingleQuestion: (id) => dispatch(getSingleQuestion(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);