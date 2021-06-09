import './style.scss';

const Tab = ({ tabNames, setActiveTab, activeTab }) => (
  <div className="tab">
    {tabNames.map((tabName) => (
      <div
        key={tabName}
        tabIndex={0}
        role="button"
        aria-label={`tab ${tabName}`}
        onClick={() => setActiveTab(tabName)}
        className={`tab-link ${activeTab === tabName ? 'active' : ''}`}
      >
        <span>{tabName}</span>
      </div>
    ))}
  </div>
);

export default Tab;
