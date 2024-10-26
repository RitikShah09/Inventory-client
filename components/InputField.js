
function InputField({
  label,
  placeholder,
  register,
  name,
  type = "text",
  options = [],
  validation = {},
  errors,
  touched,
}) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {type === "select" ? (
        <div className="relative">
          <select
            className={`w-full px-3 py-2 border cursor-pointer ${
              errors && touched ? "border-red-500" : "border-gray-300"
            } rounded-lg appearance-none`}
            {...register(name, validation)}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <i className="ri-arrow-down-s-line"></i>
          </div>
        </div>
      ) : (
        <input
          className={`px-3 py-2 border ${
            errors && touched ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
      {errors && touched && (
        <span className="text-red-500 text-sm">{errors.message}</span>
      )}
    </div>
  );
}

export default InputField;
