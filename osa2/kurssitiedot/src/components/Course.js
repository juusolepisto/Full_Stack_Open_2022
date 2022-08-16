const Course = ({course}) => {
    console.log("course", course)
    return (
      <div>
        <CourseHeader header={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const CourseHeader = (props) => {
    return (
      <div>
        <h2>{props.header}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log("content", props)
    return (
      <div>
        {props.parts.map(part =>
            <Part key={part.id} part={part.name} excercises={part.excercises}/>
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    console.log("part", props)
    return(
      <div>
        <p>{props.part} {props.excercises}</p>
      </div>
    )
  }
  
  
  const Total = (props) => {
    console.log("total", props.parts)
    var totalAmount = props.parts.reduce(function(sum, parts) {
      return sum + parts
    }, 0)
    console.log(totalAmount)
    return (
      <div>
        <p>
          <b>Total of {totalAmount} excercises </b>
        </p>
      </div>
    )
  }

  export default Course