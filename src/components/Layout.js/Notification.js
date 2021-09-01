import classes from "./Notification.module.css";

const Notification = (props) => {
  const cssClasses = classes.notification;
  return (
    <section className={cssClasses}>
      <h3>{props.title}</h3>
    </section>
  );
};

export default Notification;
