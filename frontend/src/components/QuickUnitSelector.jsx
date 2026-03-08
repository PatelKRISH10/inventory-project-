// Alternative: Quick Unit Selection Component
// Replace the unit dropdown with this for better UX

const QuickUnitSelector = ({ value, onChange, units }) => {
  const commonUnits = ['kg', 'g', 'L', 'pc', 'pkt'];
  const quickUnits = units.filter(u => commonUnits.includes(u.symbol));
  const otherUnits = units.filter(u => !commonUnits.includes(u.symbol));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {quickUnits.map((unit) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => onChange(unit.id)}
            style={{
              padding: '0.5rem 1rem',
              border: value === unit.id ? '2px solid #3498db' : '1px solid #ddd',
              backgroundColor: value === unit.id ? '#e3f2fd' : 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: value === unit.id ? 'bold' : 'normal'
            }}
          >
            {unit.symbol}
          </button>
        ))}
      </div>
      {otherUnits.length > 0 && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">Other units...</option>
          {otherUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.symbol} - {unit.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

// Usage in form:
// <QuickUnitSelector
//   value={formData.unit_id}
//   onChange={(unitId) => setFormData({ ...formData, unit_id: unitId })}
//   units={units}
// />
