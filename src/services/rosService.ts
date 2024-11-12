import ROSLIB from "roslib";

export const initializeRos = (url: string) => {
  const ros = new ROSLIB.Ros({
    url,
  });
  ros.connect(url);
  return ros;
};

export const subscribeToTopic = (
  ros: ROSLIB.Ros,
  topicName: string,
  messageType: string,
  callback: Function
) => {
  const topic = new ROSLIB.Topic({ ros, name: topicName, messageType });
  topic.subscribe((message) => callback(message));
  return topic;
};

export const publishToTopic = (
  ros: ROSLIB.Ros,
  topicName: string,
  messageType: string,
  message: any
) => {
  const topic = new ROSLIB.Topic({ ros, name: topicName, messageType });
  topic.publish(new ROSLIB.Message(message));
};
