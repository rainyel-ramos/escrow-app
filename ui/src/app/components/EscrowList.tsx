'use client'

import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "react-bootstrap";
import { useAppSelector } from "../store/hooks";
import Escrow from "./Escrow";


export interface IAssetsListProps {
  chain: any;
  address: string;
}

 
export default function EscrowList() {
  const escrowList = useAppSelector(state => state.escrowList.escrowList);
//   const [pageKey, setPageKey] = useState<string | undefined>(undefined)
   
  const hasMore = false;

  const fetchData = useCallback(async function()  {

  }, [])

  return (
    // <div style={{ height: "700px", overflow: "auto" }}>
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={hasMore}
        loader={
          <Spinner key={-1} animation="border" variant="primary" />
        }
        pageStart={0}
        useWindow={false}
      >
        <ul>
          {escrowList.length > 0 && escrowList.map(
            (item) => (
              <li key={item.address}>
                <Escrow escrowProperties={item} />
                <hr />
              </li>
            )
          )}
        </ul>
      </InfiniteScroll>
    // </div>
  );
}