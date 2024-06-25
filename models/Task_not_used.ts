import { Op } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'
import { ToDoStatusType } from '../types/defaultenumtype'
const sequelize = new Sequelize('postgres://postgres:admin123@localhost:5432/node-auth')

const Task = sequelize.define(
  'task',
  {
    task_mame: {
      type: DataType.STRING,
      allowNull: false
    },
    taskDesccription: {
      type: DataType.STRING
    },
    plannedStartDate: {
      type: DataType.DATE,
      allowNull: false
    },
    plannedEndDate: {
      type: DataType.DATE,
      allowNull: false
    },
    actualStartDate: {
      type: DataType.DATE,
      allowNull: false
    },
    actualEndDate: {
      type: DataType.DATE,
      allowNull: false
    },
    status: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: ToDoStatusType.pending
    }
  },
  {
    freezeTableName: true
  }
)

export default Task
