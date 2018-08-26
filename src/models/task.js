const mongoose= require('mongoose');

const {Schema} = mongoose;

const TaskSchema = new Schema({
  title: {type: String, requiered: true},
  descripcion:{type: String, requiered: true}
});

module.exports =mongoose.model('Task', TaskSchema);
