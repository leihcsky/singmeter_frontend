const ContentSection = ({ title, children, className = '' }) => {
  return (
    <section className={`max-w-4xl mx-auto px-4 py-12 ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-left relative inline-block">
          {title}
          <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-100 -z-10 transform -rotate-1" />
        </h2>
      )}
      <div className="tool-page-content space-y-4">{children}</div>
    </section>
  );
};

export default ContentSection;
