import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";

export function ReactDataTables({ ...props }: Config) {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    console.log("Component mounted");
    if (tableRef.current) {
      console.log("Initializing DataTable");
      const dt = new DataTables(tableRef.current, {
        ...props,
        paging: false,
      });

      if (typeof dt.destroy === "function") {
        console.log("Cleanup function registered");
        return () => {
          console.log("Cleaning up DataTable");
          dt.destroy();
        };
      }
    }
  }, [props]);

  return <table ref={tableRef}></table>;
}

export default ReactDataTables;
