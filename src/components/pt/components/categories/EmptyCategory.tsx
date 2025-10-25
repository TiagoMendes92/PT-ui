const EmptyCategory = ({ nrOfCols = 2 }: { nrOfCols?: number }) => (
  <tr>
    <td colSpan={nrOfCols} style={{ width: "auto", textAlign: "center" }}>
      Sem resultados
    </td>
  </tr>
);

export default EmptyCategory;
