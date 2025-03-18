import "../assets/styles/title.css";
import { ReactNode } from "react";

interface TitleProps {
  title: string;
  text?: string; 
  linkText?: string; 
  linkIcon?: ReactNode; 
  linkHref?: string;
  className?: string;
}

const Title = ({ title, linkText, linkIcon, linkHref, className }: TitleProps) => {
  return (
    <div className={`title-container ${className} d-flex justify-content-between align-items-center`}>
      <h2 className="title-text">{title}</h2>
      {linkIcon && linkHref && (
        <a href={linkHref} className="link-icon d-flex align-items-center">
          {linkIcon}
          {linkText && <span className="ms-2">{linkText}</span>}
        </a>
      )}
    </div>
  );
};

export default Title;
